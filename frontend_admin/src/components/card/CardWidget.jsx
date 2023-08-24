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
      <div className="ml-[18px] 2xl-max:ml-[10px] flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-lightPrimary p-3 2xl-max:p-2 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 sm-max:pl-8 ml-4  2xl-max:ml-2 flex w-auto flex-col gap-2 justify-center">
        <p className="font-dm text-lg 2xl-max:text-sm font-semibold text-gray-600">{title}</p>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {subtitle}
        </h4>
      </div>

         {divide && (
           <>
                  <div className="pr-[40px] 2xl-max:pr-[20px]
                  mx-2
                  sm:mx-8
                  2xl:mx-2
                  before:absolute before:ml-[20px]
                  2xl-max:before:ml-[10px]
                  before:mt-[-30px] before:h-[60px] before:w-[5px] before:bg-gray-200" />
                  <div className="h-50 ml-4 2xl-max:ml-2 flex w-auto gap-2 flex-col justify-center">
                      <p className="font-dm text-lg 2xl-max:text-sm font-semibold text-gray-600 ">{title2}</p>
            <h4 className="text-xl 2xl-max:text-md font-bold text-navy-700 dark:text-white">
                          {subtitle2}
                      </h4>
                  </div>
           </>
         )}
    </Card>
  );
};

export default CardWidget;