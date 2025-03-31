export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SQL Playground. All rights
            reserved.
          </p>
        </div>
        <div className="flex justify-center space-x-6 md:order-2">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">About</span>
            <span className="text-sm text-gray-500 hover:text-gray-900">
              About
            </span>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Privacy</span>
            <span className="text-sm text-gray-500 hover:text-gray-900">
              Privacy
            </span>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Terms</span>
            <span className="text-sm text-gray-500 hover:text-gray-900">
              Terms
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
