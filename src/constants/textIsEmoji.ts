const textRegex = "/[:d:>:')]/g"
const emojiRegex: any = { ":d": "😁", ":>": "😆", ":')": "🤣", ":)": "🙂", ":3": "😊", ":v": "", ":p": "😜", ";p": "🤭", "-_-": "😑", "zzz": "😴", ";o": "😕", ":-))": "😭", "-/heart": "💓", "<3": "❤", "-/ok": "👌" }
function escapeSpecialChars(regex: string) {
    return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
}
export { textRegex, emojiRegex, escapeSpecialChars } 