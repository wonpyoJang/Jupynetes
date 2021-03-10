export default class Tools {
  static showErrorAlert = (msg: String, errorCode: String) => {
    alert(msg + '\n\n[에러코드]\n' + errorCode);
  };
}
