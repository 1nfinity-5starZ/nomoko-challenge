import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IntlProvider } from "react-intl";
import de from "../../lang/de.json";

type ILang = "en" | "de";
const initialContext: {
  lang: "en" | "de";
  setLang: Dispatch<SetStateAction<ILang>>;
} = {
  lang: "en",
  setLang: () => {},
};

export const LangContext = createContext(initialContext);

const LangProvider: React.FC = ({ children }) => {
  const [lang, setLang] = useState<ILang>("en");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <IntlProvider messages={de} locale={lang} defaultLocale="en">
        {children}
      </IntlProvider>
    </LangContext.Provider>
  );
};

export const useLangContext = () => useContext(LangContext);
export default LangProvider;
