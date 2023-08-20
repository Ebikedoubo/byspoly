/**
 * Renders a Card component.
 *
 * @param {object} props - The props object containing variant, extra, children, and rest.
 * @return {JSX.Element} The rendered Card component.
 */
function Card(props) {
    const { variant, extra, children, ...rest } = props;
    return (
        <div
            className={`!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none h-28 ${extra}`}
            {...rest}
        >
            {children}
        </div>
    );
}

export default Card;