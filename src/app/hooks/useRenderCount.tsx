export const useRenderCount = () => {
  let count = 0;

  const render = () => {
    count++;
    return <div>Render count : {count / 2}</div>;
  };

  return render;
};
