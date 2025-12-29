import { Mail, Phone, PhoneCall, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
	return (
		<footer className='py-8 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
			<div className='flex flex-col items-center justify-between gap-8 md:h-36 md:flex-row'>
				{/* Left side - Social Media Links */}
				<div className='flex items-center gap-4'>
					{/* Instagram Link */}
					<a
						href='https://www.instagram.com/artlawcommunion?utm_source=qr&igsh=ZGpwZ2lzbzZyejhp'
						target='_blank'
						rel='noreferrer'
						className='w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors'
					>
						<Instagram size={16} className='text-black' />
					</a>
					
					{/* Facebook Link */}
					<a
						href='https://www.facebook.com/share/1FDZVMAwPh/'
						target='_blank'
						rel='noreferrer'
						className='w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors'
					>
						<Facebook size={16} className='text-black' />
					</a>
					
					{/* LinkedIn Link */}
					<a
						href='https://www.linkedin.com/company/art-law-communion/?lipi=urn%3Ali%3Apage%3Ad_flagship3_company%3BxM90OE%2FuQCum1Ukscxp6wQ%3D%3D'
						target='_blank'
						rel='noreferrer'
						className='w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors'
					>
						<Linkedin size={16} className='text-black' />
					</a>
				</div>

				{/* Center - Disclaimer and Copyright */}
				<div className='text-center text-sm text-white space-y-4'>
					<div>
						<p className='font-semibold'>DISCLAIMER:</p>
						<p className='max-w-md'>
							The material on this site is for general information only and is not legal advice. No liability is accepted for any loss or damage which may result from reliance on it.
						</p>
					</div>
					<div>
						© 2025, Art Law Communion, All Rights Reserved
					</div>
				</div>

				{/* Right side - Email */}
				<div className='flex items-center gap-2 text-sm'>
					<Mail size={16} className='text-white' />
					<a
						href='mailto:artlawcommunion@gmail.com'
						className='hover:text-gray-300 transition-colors'
					>
						artlawcommunion@gmail.com
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;