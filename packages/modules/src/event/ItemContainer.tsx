interface ItemContainerProp {
  className?: string;
}

export const ItemContainer: React.FC<ItemContainerProp> = ({
  className,
  children,
}) => {
  return (
    <div className={`rounded-2xl bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
};
