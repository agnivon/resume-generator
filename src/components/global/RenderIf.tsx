type RenderIfProps = {
  isTrue?: boolean;
  children?: React.ReactNode;
};

const RenderIf = ({ isTrue = true, children }: RenderIfProps) => {
  return <>{isTrue && children}</>;
};

export default RenderIf;
