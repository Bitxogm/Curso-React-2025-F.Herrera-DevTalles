import useCounter from "../hooks/useCounterHook";

const MyCounterApp = () => {
  const {  counter, handleAdd, handleSubstract, handleReset } = useCounter(0);

  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h1>Counter : {counter}</h1>
        <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
          <button onClick={handleAdd}  >+1</button>
          <button onClick={handleSubstract} >-1</button>
          <button onClick={handleReset} >Reset</button>
        </div>
      </div>
    </>
  );
};
export default MyCounterApp;









