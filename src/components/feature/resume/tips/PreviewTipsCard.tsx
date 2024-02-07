export default function PreviewTipsCard() {
  return (
    <div
      className="p-4 w-full rounded-lg bg-blue-50 dark:bg-blue-900"
      role="alert"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
          Tips
        </span>
        {/* <button
          type="button"
          className=" bg-blue-50 -mx-1 -my-1 inline-flex justify-center items-center text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
          aria-label="Close"
          onClick={() => setShow(false)}
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="w-5 h-5" aria-hidden="true" />
        </button> */}
      </div>
      <div /* style={{ maxHeight: maxCharacters * 0.8 }} */>
        <ul className="list-disc p-2 pl-4 text-sm space-y-2 text-blue-800 dark:text-blue-400">
          <li>
            Use the browser/system print dialog to customize the final output
          </li>
          <li>
            Make sure the paper size selected in the print dialog matches the
            one selected in preview settings
          </li>
          <li>
            <b>{"Save as PDF"}</b> option is recommended in the browser print
            dialog to ensure that the text in generated PDF can be parsed by
            other tools
          </li>
        </ul>
      </div>
    </div>
  );
}
