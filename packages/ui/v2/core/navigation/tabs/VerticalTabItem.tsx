import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentProps, Fragment } from "react";

import classNames from "@calcom/lib/classNames";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { SVGComponent } from "@calcom/types/SVGComponent";
import { Icon } from "@calcom/ui/Icon";

import { Skeleton } from "../../skeleton";

export type VerticalTabItemProps = {
  name: string;
  info?: string;
  icon?: SVGComponent;
  disabled?: boolean;
  children?: VerticalTabItemProps[];
  textClassNames?: string;
  className?: string;
  isChild?: boolean;
  hidden?: boolean;
  disableChevron?: boolean;
  href: string;
  isExternalLink?: boolean;
  linkProps?: Omit<ComponentProps<typeof Link>, "href">;
};

const VerticalTabItem = function ({
  name,
  href,
  info,
  isChild,
  disableChevron,
  linkProps,
  ...props
}: VerticalTabItemProps) {
  const { t } = useLocale();
  const { asPath } = useRouter();
  const isCurrent = asPath.startsWith(href);

  return (
    <Fragment key={name}>
      {!props.hidden && (
        <>
          <Link key={name} href={href} {...linkProps}>
            <a
              target={props.isExternalLink ? "_blank" : "_self"}
              className={classNames(
                props.textClassNames || "text-sm font-medium leading-none text-gray-600",
                "group flex w-64 flex-row items-center rounded-md px-3 py-[10px] hover:bg-gray-100 group-hover:text-gray-700  [&[aria-current='page']]:bg-gray-200 [&[aria-current='page']]:text-gray-900",
                props.disabled && "pointer-events-none !opacity-30",
                (isChild || !props.icon) && "ml-7 mr-5 w-auto",
                !info ? "h-9" : "h-14",
                props.className
              )}
              data-testid={`vertical-tab-${name}`}
              aria-current={isCurrent ? "page" : undefined}>
              {props.icon && (
                <props.icon className="mr-[10px] h-[16px] w-[16px] self-start stroke-[2px] md:mt-0" />
              )}
              <div>
                <span className="flex items-center space-x-2">
                  <Skeleton as="p">{t(name)}</Skeleton>
                  {props.isExternalLink ? <Icon.FiExternalLink /> : null}
                </span>
                {info && (
                  <Skeleton as="p" className="mt-1 text-xs font-normal">
                    {t(info)}
                  </Skeleton>
                )}
              </div>
              {!disableChevron && isCurrent && (
                <div className="ml-auto self-center">
                  <Icon.FiChevronRight
                    width={20}
                    height={20}
                    className="h-auto w-[20px] stroke-[1.5px] text-gray-700"
                  />
                </div>
              )}
            </a>
          </Link>
          {props.children?.map((child) => (
            <VerticalTabItem key={child.name} {...child} isChild />
          ))}
        </>
      )}
    </Fragment>
  );
};

export default VerticalTabItem;
