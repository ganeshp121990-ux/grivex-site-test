import codecs
import re

file_path = r'c:\grivex-site 3.0\components\Catalog\Footer.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

replacements = {
    'bg-[#080808]': 'bg-[#FCFBF8]',
    'bg-[#0C0C0C]': 'bg-[#F2EFE9]',
    'bg-[#101010]': 'bg-[#FDFDFB]',
    'hover:bg-[#050505]': 'hover:bg-[#EAE4D9]',
    'hover:bg-[#151515]': 'hover:bg-[#F5F2EA]',
    'bg-[#050505]': 'bg-[#FCFBF8]',
    
    'text-[#E0E0E0]': 'text-[#2C352D]',
    'text-[#888]': 'text-[#5C665A]',
    'text-[#666]': 'text-[#748071]',
    'text-[#444]': 'text-[#748071]',
    'text-[#141414]': 'text-[#F4EFE6]', 

    'border-[#333]': 'border-[#EAE4D9]',
    'placeholder-[#333]': 'placeholder-[#AFB5AB]',
    'bg-[#333]': 'bg-[#DCD3C6]',
    
    'text-[#C2A676]': 'text-[#4A5D4E]',
    'bg-[#C2A676]': 'bg-[#4A5D4E]',
    'border-[#C2A676]': 'border-[#4A5D4E]',
    'focus:border-[#C2A676]': 'focus:border-[#4A5D4E]',
    'hover:text-[#C2A676]': 'hover:text-[#4A5D4E]',
    'hover:border-[#C2A676]': 'hover:border-[#4A5D4E]',
    'selection:bg-[#C2A676]': 'selection:bg-[#4A5D4E]',

    'text-[#080808]': 'text-[#FCFBF8]',
    'bg-[#E0E0E0]': 'bg-[#4A5D4E]',
}

for k, v in replacements.items():
    text = text.replace(k, v)

# Re-adjust specific buttons/chips for better contrast & premium feel
text = text.replace('bg-[#4A5D4E] text-[#FCFBF8] px-12 py-4 hover:bg-[#4A5D4E]', 'bg-[#4A5D4E] text-[#FCFBF8] px-12 py-4 hover:bg-[#3A4A3D] shadow-md rounded-sm transition-all')

# Make input fields more premium
text = text.replace('border-b border-[#EAE4D9] py-2', 'border-b border-[#EAE4D9] py-2 text-[#2C352D]')

# Add rounded corners to border wraps for organic feel
text = text.replace('border border-[#4A5D4E]/20 p-6 bg-[#FCFBF8]', 'border border-[#EAE4D9] rounded-md shadow-sm p-6 bg-[#FCFBF8]')
text = text.replace('border border-[#EAE4D9] px-4 py-2 bg-[#F2EFE9]', 'border border-[#EAE4D9] rounded-md shadow-sm px-4 py-2 bg-[#F2EFE9]')
text = text.replace('border border-[#4A5D4E]/20 bg-[#F2EFE9] p-16 mb-8', 'border border-[#EAE4D9] bg-[#FDFDFB] rounded-md shadow-md p-16 mb-8')

# Ensure border-[transparent]/opacity stuff looks good. The noise overlay needs adjusting to not look like static on white bg
text = text.replace('opacity-[0.03] bg-[url('/noise.svg')]', 'opacity-[0.05] bg-[url('/noise.svg')]')
text = text.replace('mix-blend-overlay', 'mix-blend-multiply')

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(text)

print('Done')
