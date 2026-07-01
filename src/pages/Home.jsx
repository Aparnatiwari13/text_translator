import { useState } from "react";
import { translateText } from "../services/translatorApi";

function Home() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("hi");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (text.trim() === "") {
      alert("Please enter some text");
      return;
    }

    setLoading(true);

    try {
      const result = await translateText(text, language);

      console.log(result);

      if (result) {
        setTranslatedText(
          result.trans || result.text || "Translation received"
        );
      }
    } catch (error) {
      alert("Translation failed. Please try again.");
    }

    setLoading(false);
  };

  const handleCopy = () => {
    if (translatedText === "") {
      alert("Nothing to copy!");
      return;
    }

    navigator.clipboard.writeText(translatedText);
    alert("Copied Successfully!");
  };

  const handleClear = () => {
    setText("");
    setTranslatedText("");
    setLanguage("hi");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-5">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 w-full max-w-xl border border-gray-100/50">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/20 mb-4">
            <span className="text-3xl">🌐</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Language Translator
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Translate text into multiple languages
          </p>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <span className="text-blue-500">📝</span> 
            Enter Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your text in English..."
            className="w-full border border-gray-200 rounded-xl p-4 h-36 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none bg-gray-50/50 hover:bg-white text-gray-700 placeholder-gray-400"
          />
          <div className="flex justify-between text-xs text-gray-400 px-1">
            <span>{text.length} characters</span>
            <span>English</span>
          </div>
        </div>

        {/* Language Select */}
        <div className="mt-5 space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <span className="text-green-500">🎯</span> 
            Target Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50 hover:bg-white text-gray-700 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-no-repeat bg-[position:right_16px_center] pr-12"
          >
            <option value="hi">🇮🇳 Hindi</option>
            <option value="fr">🇫🇷 French</option>
            <option value="es">🇪🇸 Spanish</option>
            <option value="de">🇩🇪 German</option>
            <option value="it">🇮🇹 Italian</option>
            <option value="ja">🇯🇵 Japanese</option>
            <option value="ko">🇰🇷 Korean</option>
            <option value="ru">🇷🇺 Russian</option>
            <option value="ar">🇸🇦 Arabic</option>
            <option value="zh-CN">🇨🇳 Chinese</option>
          </select>
        </div>

        {/* Translate Button */}
        <button
          onClick={handleTranslate}
          disabled={loading}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Translating...
            </>
          ) : (
            <>
              <span>🚀</span>
              Translate
            </>
          )}
        </button>

        {/* Result Box */}
        <div className="mt-6 border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-[100px] transition-all duration-200 hover:border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <span className="text-purple-500">📄</span> 
              Translated Text
            </h2>
            {translatedText && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                ✓ Done
              </span>
            )}
          </div>
          <p className="text-gray-700 leading-relaxed min-h-[36px]">
            {translatedText || (
              <span className="text-gray-400 italic">Your translation will appear here...</span>
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={handleCopy}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium py-2.5 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-md shadow-green-500/20 flex items-center justify-center gap-2"
          >
            <span>📋</span>
            Copy
          </button>
          <button
            onClick={handleClear}
            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium py-2.5 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-md shadow-gray-500/20 flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            Clear
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-400">✨ Powered by APARNA TIWARI</span>
          <span className="text-xs text-gray-400">
            {language && (
              <span>Translating to: {
                {hi: 'Hindi', fr: 'French', es: 'Spanish', de: 'German', it: 'Italian', 
                 ja: 'Japanese', ko: 'Korean', ru: 'Russian', ar: 'Arabic', 'zh-CN': 'Chinese'}[language]
              }</span>
            )}
          </span>
        </div>

      </div>
    </div>
  );
}

export default Home;