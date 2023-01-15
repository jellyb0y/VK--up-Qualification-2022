import DarkPreviewImage from './assets/dark_preview.module.jpg';
import LightPreviewImage from './assets/light_preview.module.jpg';
import AnimePreviewImage from './assets/anime_preview.module.png';
import YandexOfficePreviewImage from './assets/yandex_office_preview.module.jpg';

import { registerTheme } from '@lib/Themes/themeRegistry';
import { Schemes } from '@lib/Themes/types';

// Цветные темы
registerTheme('brown', { scheme: Schemes.Dark, color: '#4A352F' });
registerTheme('gray', { scheme: Schemes.Dark, color: '#424242' });
registerTheme('purpule', { scheme: Schemes.Dark, color: '#5A355A' });
registerTheme('dark_blue', { scheme: Schemes.Dark, color: '#35385A' });
registerTheme('purpule_blue', { scheme: Schemes.Dark, color: '#646ECB' });
registerTheme('pink', { scheme: Schemes.Dark, color: '#E73672' });
registerTheme('red', { scheme: Schemes.Dark, color: '#F44336' });
registerTheme('green', { scheme: Schemes.Dark, color: '#388E3C' });
registerTheme('mint', { scheme: Schemes.Dark, color: '#81D8D0' });
registerTheme('pale_brown', { scheme: Schemes.Dark, color: '#E2DCD2' });
registerTheme('peach', { scheme: Schemes.Dark, color: '#FFEBCD' });
registerTheme('soft_green', { scheme: Schemes.Dark, color: '#E7EED2' });
registerTheme('soft_blue', { scheme: Schemes.Dark, color: '#D0F0F7' });
registerTheme('soft_purpule', { scheme: Schemes.Dark, color: '#C9D0FB' });
registerTheme('soft_white', { scheme: Schemes.Dark, color: '#DDF3FF' });
registerTheme('dark_white', { scheme: Schemes.Dark, color: '#F0F0F0' });

// Базовые темы
registerTheme(Schemes.Dark, { scheme: Schemes.Dark, color: '#000', image: DarkPreviewImage });
registerTheme(Schemes.Light, { scheme: Schemes.Light, color: '#F0F0F0', image: LightPreviewImage });

// Дополнительные темы
registerTheme('anime', { scheme: Schemes.Dark, color: '#6B1344', image: AnimePreviewImage });
registerTheme('yandex_office', { scheme: Schemes.Dark, color: '#F0F0F0', image: YandexOfficePreviewImage });
