type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <main className="max-w-7xl w-screen m-auto text-center">{children}</main>
  );
}

export default Layout;
