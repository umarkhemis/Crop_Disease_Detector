
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        predict: "Predict",
        crop: "Crop",
      },
    },
    lg: {
      translation: {
        welcome: "Tukusanyukidde",
        predict: "Lowooza",
        crop: "Ebijimusa",
      },
    },
    rn: {
      translation: {
        welcome: "Tukusanyukidde",
        predict: "Huliriza",
        crop: "Ebihingwa",
      },
    },
    lgbr: {
      translation: {
        welcome: "Awadifene",
        predict: "Kangi",
        crop: "Pele",
      },
    },
    lgch: {
      translation: {
        welcome: "Mare keni",
        predict: "Yubo",
        crop: "Yoo cwiny",
      },
    },
    lango: {
      translation: {
        welcome: "Arii",
        predict: "Telo",
        crop: "Bikony",
      },
    },
    ateso: {
      translation: {
        welcome: "Ejoka noi",
        predict: "Kere",
        crop: "Ison",
      },
    },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
