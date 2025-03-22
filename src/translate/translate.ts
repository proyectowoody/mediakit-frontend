
export const translateText = async (text: any, targetLang: any) => {

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        return result[0][0][0];
    } catch (error) {
        console.error("Error traduciendo:", error);
        return text;
    }
};







