/* /store/reducer/index.js */
//PROCESS라는 액션을 정의하는 액션 생성함수 process, parameter은 payload로 넘어감
export const process = (encrypt, text, cypher) => {
  return {
    type: "PROCESS",
    payload: {
      encrypt,
      text,
      cypher,
    },
  };
};