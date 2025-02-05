import ThemeToggle from "@/components/ThemeToggle";
const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-x-2 text-foreground text-lg">
      <ThemeToggle />
      <div className="font-semibold tracking-wider">E.L.S</div>
    </div>
  );
};

export default Logo;
