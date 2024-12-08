import { useContext } from "react";
import LanguageContext from "../LanguageContext";

export default function LanguageSelector() {
    const { language, setLanguage } = useContext(LanguageContext); // Accède au contexte

    const handleChange = (event) => {
        setLanguage(event.target.value); // Change la langue
    };

    return (
        <div className="bg-slate-800 text-white rounded-md p-2 absolute right-5 inset-y-5">
            <label htmlFor="language-select" className="sr-only">Select Language</label>
            <select
                id="language-select"
                className="bg-slate-800"
                value={language}
                onChange={handleChange}
            >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
            </select>
            <div className="w-full h-0.5 bg-white mt-2"></div>
        </div>
    );
}
