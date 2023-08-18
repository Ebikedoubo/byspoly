/**
 * Renders the Footer component.
 *
 * @return {ReactNode} The rendered Footer component.
 */
const Footer = () => {
    return (
        <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-row">
            <h5 className="mb-4 text-center text-sm font-medium text-gray-600 sm:!mb-0 md:text-lg">
                <p className="mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base">
                    ©{1900 + new Date().getYear()} Bayelsa State Polytechnic.
                </p>
            </h5>
            <div>
                <ul className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10">

                </ul>
            </div>
        </div>
    );
};

export default Footer;