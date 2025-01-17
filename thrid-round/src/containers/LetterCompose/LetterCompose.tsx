import { connect } from 'react-redux';
import classnames from 'classnames';
import { KeyboardEventHandler, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import CloseIcon from '@assets/images/close.svg';
import AttachIcon from '@assets/images/attach.svg';

import Wysiwyg from '@components/Wysiwyg';
import Button, { ButtonMode } from '@components/Button';
import Address from './components/Address/Address';
import DragNDrop from '@components/DragNDropArea';
import FileComponent from './components/File';

import { useOverlay } from '@hooks/useOverlay';
import { useLanguages } from '@lib/Languages/useLanguages';
import { transformToData } from '@components/Wysiwyg/utils/transformToData';
import { sendLetterResolver } from '@data/resolvers/letters/sendLetterResolver';
import { clearSendingFormAction } from '@data/actions/letters';

import S from './LetterCompose.scss';

import type { FC } from 'react';
import type { LetterComposeProps } from './types';
import type { SendLetterParams } from '@data/resourses/letters/sendLetter';
import type { State } from '@data/types';
import type { ThunkDispatch } from '@data/types/actions';

const mapDispatchToProps = (
  dispatch: ThunkDispatch,
  props: Pick<LetterComposeProps, 'onClose'>,
) => ({
  sendLetter: (data: SendLetterParams) => dispatch(sendLetterResolver(data)),
  onClose: () => {
    dispatch(clearSendingFormAction());
    props.onClose();
  },
});

const mapStateToProps = (state: State) => ({
  isSending: state.letters.isLetterSending,
  hasError: state.letters.hasSendingError,
  hasSent: state.letters.hasLetterSent,
});

const LetterCompose: FC<LetterComposeProps> = ({
  isSending,
  hasError,
  hasSent,
  onClose,
  sendLetter,
}) => {
  const [attachFiles, setAttachFiles] = useState<File[]>([]);
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);
  const [isFieldEmpty, setFieldEmpty] = useState(true);
  
  const applyLanguage = useLanguages();

  const attachInputRef = useRef<HTMLInputElement>();
  const subjRef = useRef<HTMLInputElement>();
  const fieldRef = useRef<HTMLDivElement>();
  const containerRef = useOverlay<HTMLDivElement>({ onClose });

  const checkFieldEmpty = (status: boolean) => {
    setFieldEmpty(!status);
  };

  const removeEmail = (email: string) => setSelectedAddresses((addresses) => {
    const newAddresses = [...addresses];

    const index = newAddresses.indexOf(email);
    if (index !== -1) {
      newAddresses.splice(index, 1);
    }

    return newAddresses;
  });

  const onEnterEmail: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (event.code === 'Backspace') {
      if (value.length) {
        return;
      }
    
      const lastEmail = selectedAddresses[selectedAddresses.length - 1];

      if (!lastEmail) {
        return;
      }

      target.value = lastEmail;
      removeEmail(lastEmail);

      return;
    }

    if (event.code !== 'Enter') {
      return;
    }

    if (value.match(/@.+\..+/)) {
      setSelectedAddresses((addresses) => [...addresses, value]);
      target.value = '';
    }
  };

  const sendMessage = () => {
    if (!fieldRef.current || isFieldEmpty) {
      return;
    }

    const data = transformToData(fieldRef.current);

    if (!selectedAddresses) {
      return;
    }

    sendLetter({
      to: selectedAddresses,
      subj: subjRef.current.value,
      data,
    });
  };

  const addFiles = (attachedFiles: File[] | FileList) => {
    setAttachFiles((files) => [...files, ...attachedFiles]);
  };

  const removeFile = (file: File) => setAttachFiles((files) => {
    const newFiles = [...files];
    const index = newFiles.indexOf(file);
    if (index !== -1) {
      newFiles.splice(index, 1);
    }
    return newFiles;
  });

  const onClickAttach = () => {
    attachInputRef.current?.click();
  };

  const onAttach = () => {
    const files = attachInputRef.current?.files;
    if (files?.length) {
      addFiles(files);
    }
  };

  const isButtonDisabled = useMemo(() => (
    !selectedAddresses.length || isFieldEmpty
  ), [selectedAddresses, fieldRef.current, isFieldEmpty]);

  const isStatusWindowOpen = hasSent || hasError || isSending;

  const blurCn = classnames(S.content, { [S.blur]: isStatusWindowOpen });

  return createPortal((
    <div className={S.shadow}>
      <div ref={containerRef} className={S.modal}>
        <DragNDrop
          className={S.dng}
          onDropFile={addFiles}
          onDragClassName={S.dngActive}
        >
          {applyLanguage(['Перетащите файлы сюда', 'Drop file here'])}
        </DragNDrop>
        <div
          onClick={onClose}
          className={S.closeButton}
        >
          <CloseIcon />
        </div>
        {isStatusWindowOpen && (
          <div className={S.statusWindow}>
            {hasSent ? (
              <>
                <span className={S.text}>
                  {applyLanguage(['Письмо отправлено', 'Letter has been sent'])}
                </span>
                <span className={S.subText}>
                  {applyLanguage(['Кому', 'To'])}: {selectedAddresses.join(', ')}
                </span>
              </>
            ) : hasError ? (
              <>
                <span className={S.text}>
                  {applyLanguage(['Произошла ошибка', 'An error has occurred'])}
                </span>
                <span className={S.subText}>
                  {applyLanguage(['Попробуйте позднее', 'Try again later'])}
                </span>
                <Button
                  className={S.button}
                  onClick={sendMessage}
                  mode={ButtonMode.Secondary}
                >
                  {applyLanguage(['Повторить', 'Try again'])}
                </Button>
              </>
            ) : isSending && (
              <>
                <span className={S.text}>
                  {applyLanguage(['Письмо отправляется...', 'Letter is being sent'])}
                </span>
              </>
            )}
          </div>
        )}
        <div className={blurCn}>
          <div className={S.field}>
            <span>{applyLanguage(['Кому', 'To'])}</span>
            {selectedAddresses.map((email) => (
              <Address
                key={email}
                className={S.address}
                email={email}
                onRemove={() => removeEmail(email)}
              />
            ))}
            <input
              spellCheck={false}
              className={S.input}
              onKeyUp={onEnterEmail}
            />
          </div>
          <div className={S.field}>
            <span>{applyLanguage(['Тема', 'Subject'])}</span>
            <input ref={subjRef} className={S.input} />
          </div>
          {attachFiles.length ? (
            <div className={S.files}>
              {attachFiles.map((file, index) => (
                <FileComponent
                  key={index}
                  className={S.file}
                  onRemove={() => removeFile(file)}
                  file={file}
                />
              ))}
            </div>
          ) : null}
          <Wysiwyg
            ref={fieldRef}
            className={S.wysiwyg}
            onStatusChange={checkFieldEmpty}
            controlsSlot={(
              <Button
                onClick={onClickAttach}
                className={S.attachButton}
                mode={ButtonMode.Transparent}
              >
                <AttachIcon />
                {applyLanguage(['Прикрепить файл', 'Attach file'])}
                <input
                  ref={attachInputRef}
                  type="file"
                  multiple
                  onChange={onAttach}
                />
              </Button>
            )}
          />
          {!isStatusWindowOpen && (
            <div className={S.controls}>
              <Button
                disabled={isButtonDisabled}
                onClick={sendMessage}
                mode={ButtonMode.Secondary}
              >
                {applyLanguage(['Отправить', 'Send'])}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  ), document.body);
};

export default connect(mapStateToProps, mapDispatchToProps)(LetterCompose);
