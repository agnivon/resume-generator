type ModalFooterProps = {
  children?: React.ReactNode;
};

const ModalFooter = ({ children }: ModalFooterProps) => {
  return (
    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
      {children}
    </div>
  );
};

export default ModalFooter;
