export type Attributes = Record<string, string>;

export type WysiwygElement = {
  tag: string;
  children: WysiwygData;
  attrs: Attributes;
};

export type WysiwygData = (string | WysiwygElement)[];

export const getAttributes = (element: HTMLElement): Attributes => {
  return Array.from(element.attributes).reduce((acc, attribute) => {
    acc[attribute.name] = attribute.value;
    return acc;
  }, {} as Attributes);
};

export const transformToData = (element: HTMLElement): WysiwygData => {
  const elements = Array.from(element.childNodes);

  return elements.reduce((list, element, index) => {
    if (element instanceof Text) {
      list[index] = element.data;
    }

    if (element instanceof HTMLElement) {
      list[index] = {
        tag: element.tagName.toLowerCase(),
        attrs: getAttributes(element),
        children: transformToData(element),
      };
    }

    return list;
  }, [] as WysiwygData);
};
