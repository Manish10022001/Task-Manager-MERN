const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden md:block bg-[#F4F6F9] border-t border-[#E8EAED] mt-auto">
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-6">
        {/* Top section */}
        <div className="grid grid-cols-4 gap-8 mb-10">
          {/* Brand col */}
          <div className="col-span-2">
            <div className="text-xl font-extrabold text-[#111827] tracking-tight mb-2">
              done<span className="text-[#059669]">.</span>
            </div>
            <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-sm">
              A clean, fast task manager built to help you stay focused and
              organized. Create tasks, track progress, and get things done — one
              tick at a time.
            </p>

            {/* Tech badges */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {["MongoDB", "Express", "React", "Node.js"].map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-semibold px-2.5 py-1 bg-white border border-[#E8EAED] rounded-lg text-[#6B7280]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Product col */}
          <div>
            <p className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-4">
              Product
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Register", href: "/register" },
                { label: "Login", href: "/login" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-[#9CA3AF] hover:text-[#059669] transition"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Developer col */}
          <div>
            <p className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-4">
              Developer
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "GitHub", href: "https://github.com/Manish10022001" },
                {
                  label: "Source Code",
                  href: "https://github.com/Manish10022001/Task-Manager-MERN",
                },
                { label: "README", href: "https://github.com" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[#9CA3AF] hover:text-[#059669] transition"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E8EAED] pt-5 flex items-center justify-between gap-4">
          <p className="text-xs text-[#9CA3AF]">
            © {currentYear}{" "}
            <span className="font-bold text-[#111827]">done.</span> — All rights
            reserved.
          </p>

          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            <p className="text-xs text-[#9CA3AF]">
              Simplify your workflow, one task at a time
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
