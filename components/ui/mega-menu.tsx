import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type MegaMenuItem = {
  id: number;
  label: string;
  subMenus?: {
    title: string;
    items: {
      label: string;
      description: string;
      icon: React.ElementType;
      link?: string;
    }[];
  }[];
  link?: string;
};

export interface MegaMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: MegaMenuItem[];
  className?: string;
}

const MegaMenu = React.forwardRef<HTMLUListElement, MegaMenuProps>(
  ({ items, className, ...props }, ref) => {
    const [openMenu, setOpenMenu] = React.useState<string | null>(null);
    const [isHover, setIsHover] = React.useState<number | null>(null);

    const handleHover = (menuLabel: string | null) => {
      setOpenMenu(menuLabel);
    };

    return (
      <ul
        ref={ref}
        className={`relative flex items-center space-x-0 ${className || ""}`}
        {...props}
      >
        {items.map((navItem) => {
          if (!navItem.subMenus && navItem.link) {
            return (
              <li key={navItem.label} className="relative">
                <a
                  href={navItem.link}
                  className="relative flex cursor-pointer items-center justify-center gap-1 py-1.5 px-4 text-sm font-medium transition-colors duration-300 group
                    text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 z-10"
                  onMouseEnter={() => setIsHover(navItem.id)}
                  onMouseLeave={() => setIsHover(null)}
                >
                  {isHover === navItem.id && (
                    <motion.div
                      layoutId="hover-bg"
                      className="absolute inset-0 size-full bg-zinc-100 dark:bg-zinc-800"
                      style={{ borderRadius: 99, zIndex: -1 }}
                    />
                  )}
                  <span className="relative z-10">{navItem.label}</span>
                </a>
              </li>
            );
          }

          return (
            <li
              key={navItem.label}
              className="relative"
              onMouseEnter={() => handleHover(navItem.label)}
              onMouseLeave={() => handleHover(null)}
            >
              <button
                className="relative flex cursor-pointer items-center justify-center gap-1 py-1.5 px-4 text-sm font-medium transition-colors duration-300 group
                  text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 z-10"
                onMouseEnter={() => setIsHover(navItem.id)}
                onMouseLeave={() => setIsHover(null)}
              >
                {(isHover === navItem.id || openMenu === navItem.label) && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute inset-0 size-full bg-zinc-100 dark:bg-zinc-800"
                    style={{ borderRadius: 99, zIndex: -1 }}
                  />
                )}
                <span className="relative z-10">{navItem.label}</span>
                {navItem.subMenus && (
                  <ChevronDown
                    className={`relative z-10 h-4 w-4 transition-transform duration-300 group-hover:rotate-180 ${
                      openMenu === navItem.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              <AnimatePresence>
                {openMenu === navItem.label && navItem.subMenus && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-auto pt-3 z-10">
                    <motion.div
                      className="w-max border border-zinc-200 bg-white p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
                      style={{ borderRadius: 14 }}
                      layoutId="menu"
                    >
                      <div className="flex w-fit shrink-0 space-x-6 overflow-hidden">
                        {navItem.subMenus.map((sub) => (
                          <motion.div layout className="w-full" key={sub.title}>
                            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                              {sub.title}
                            </h3>
                            <ul className="space-y-4">
                              {sub.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <li key={item.label}>
                                    <a
                                      href={item.link || "#"}
                                      className="flex items-start space-x-3 group"
                                    >
                                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md border text-zinc-600 border-zinc-200 transition-colors duration-300 group-hover:bg-zinc-100 group-hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-800 dark:group-hover:text-zinc-50">
                                        <Icon className="h-4 w-4 flex-none" />
                                      </div>
                                      <div className="w-max leading-none">
                                        <p className="shrink-0 text-sm font-medium text-zinc-900 dark:text-zinc-50 transition-colors duration-300 group-hover:text-primary mb-1">
                                          {item.label}
                                        </p>
                                        <p className="shrink-0 text-[11px] leading-tight text-zinc-500 transition-colors duration-300 dark:text-zinc-400">
                                          {item.description}
                                        </p>
                                      </div>
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    );
  }
);

MegaMenu.displayName = "MegaMenu";

export default MegaMenu;
