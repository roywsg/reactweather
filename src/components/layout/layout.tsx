type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <main className="p-2 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl m-3 mx-auto">
      {children}
    </main>
  );
}

export default Layout;
