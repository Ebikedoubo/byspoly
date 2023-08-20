import Card from "./Card";

/**
 * Renders a card widget with provided data.
 *
 * @param {object} props - The props object containing the following properties:
 *   - icon: The icon element to be displayed.
 *   - title: The title of the card widget.
 *   - subtitle: The subtitle of the card widget.
 *   - title2: The second title of the card widget.
 *   - subtitle2: The second subtitle of the card widget.
 *   - divide: Optional. A boolean indicating whether to display a dividing line.
 * @return {JSX.Element} The rendered card widget.
 */
const CardWidget = ({ icon, title, subtitle, title2, subtitle2, divide = false }) => {
  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px] ">
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 ml-4 flex w-auto flex-col gap-2 justify-center">
        <p className="font-dm text-lg font-semibold text-gray-600">{title}</p>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {subtitle}
        </h4>
      </div>

         {divide && (
           <>
                  <div className="pr-[40px] before:absolute before:ml-[20px] before:mt-[-30px] before:h-[60px] before:w-[5px] before:bg-gray-200" />
                  <div className="h-50 ml-4 flex w-auto gap-2 flex-col justify-center">
                      <p className="font-dm text-lg font-semibold text-gray-600 ">{title2}</p>
                      <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                          {subtitle2}
                      </h4>
                  </div>
           </>
         )}
    </Card>
  );
};

export default CardWidget;