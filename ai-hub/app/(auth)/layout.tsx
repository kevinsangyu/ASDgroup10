const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex item-center justify-center h-full">
            {children}
        </div>
    );
}

export default AuthLayout;