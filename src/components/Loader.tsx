interface LoaderProps {
  type: string;
}

function Loader({ type }: LoaderProps) {
  if (type === "small")
    return (
      <div className="absolute flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
        <div className="loader"></div>
      </div>
    );
  if (type === "large")
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
        <div className="loader"></div>
      </div>
    );
}

export default Loader;
