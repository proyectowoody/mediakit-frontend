import { useState, useEffect, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "./LanguageContext";
import { translateText } from "./translate";

export const useLanguage = () => {
    const { i18n } = useTranslation();
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }

    const { language, setLanguage } = context;
    const [translatedJSON, setTranslatedJSON] = useState<any>(null);
    const translationCache = useRef(new Map());

    const changeLanguage = async (lng: string) => {
        if (language !== lng) {
            setLanguage(lng);
            i18n.changeLanguage(lng);

            if (!translationCache.current.has(lng)) {
                const translatedData = await translateText(i18n.store.data[i18n.language], lng);
                translationCache.current.set(lng, translatedData);
            }
            setTranslatedJSON(translationCache.current.get(lng));
            window.location.reload();
        }
    };

    const t = (key: string) => translatedJSON?.[key] || i18n.t(key);

    useEffect(() => {
        const translateAllTexts = async () => {
            const elements = document.querySelectorAll("[data-translate], input[placeholder]");

            const promises = Array.from(elements).map(async (el) => {
                if (el instanceof HTMLInputElement) {
                    const originalPlaceholder = el.getAttribute("data-original-placeholder") || el.placeholder;
                    if (!el.getAttribute("data-original-placeholder")) {
                        el.setAttribute("data-original-placeholder", originalPlaceholder);
                    }
                    el.placeholder = translationCache.current.has(originalPlaceholder)
                        ? translationCache.current.get(originalPlaceholder)
                        : await translateText(originalPlaceholder, language);
                } else {
                    const originalText = el.getAttribute("data-original-text") || el.textContent?.trim() || "";
                    if (!el.getAttribute("data-original-text")) {
                        el.setAttribute("data-original-text", originalText);
                    }
                
                    const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                
                    if (textNode) {
                        const translatedText = translationCache.current.has(originalText)
                            ? translationCache.current.get(originalText)
                            : await translateText(originalText, language);
                
                        textNode.nodeValue = translatedText;
                    }
                }
                
            });

            await Promise.all(promises);
        };

        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        const observer = new MutationObserver(() => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(translateAllTexts, 300);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        translateAllTexts();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [language]);

    return { language, changeLanguage, t };
};
