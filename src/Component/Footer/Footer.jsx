function Footer() {
  return (
    <>
      <div className="flex justify-center items-center bg-slate-950 py-20">
        <div className="w-[90%] mx-auto">
          <h3 className="text-green-600 font-black text-4xl mb-5">
            Get The FreshCart app
          </h3>
          <p className="text-white mb-5">
            We willsend you a link, open it on your phone to download the app.
          </p>
          <div className="flex flex-row gap-4">
            {/* Input: Designation [h-12] & min-w-[12rem] */}
            <input
              className="h-10 md:w-10/12 w-8/12 rounded-lg border-emerald-500 indent-4 text-emerald-900 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600"
              type="text"
              placeholder="Email"
            />
            {/* Button: Submit [h-8] */}
            <button className="h-10 md:w-2/12 w-4/12 rounded-lg border-2 border-emerald-600 bg-emerald-500 text-emerald-50 shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600">
              Share App Link
            </button>
          </div>
          <hr className="my-5"></hr>
          <div className="text-white flex md:flex-row flex-col items-center justify-between gap-10">
            <div className="flex flex-row gap-x-5 items-center">
              Payment Partners :
              <i className="fa-brands fa-amazon-pay text-blue-600 text-3xl" />
              <i className="fa-brands fa-cc-mastercard text-yellow-400 text-3xl" />
              <i className="fa-brands fa-paypal text-purple-700 text-3xl" />
            </div>
            <div className="flex flex-row gap-x-5 items-center ">
              Get deliveries with FreshCart
              <i className="fa-brands fa-app-store text-sky-500 text-3xl" />
              <i className="fa-brands fa-google-play text-green-500 text-3xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
