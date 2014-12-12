# Require any additional compass plugins here.

dir = File.dirname(__FILE__)
css_dir = "content/styles"
sass_dir = "scss"
images_dir = "content/styles/images"
sprite_load_path = "scss/sprites"
relative_assets = true
chunky_png_options = :best_compression
output_style = :expanded
line_comments = false

oldFileNames = Array.new

on_sprite_saved do |filename|
     if File.exists?(filename)
             newFileName = filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
             FileUtils.cp filename, newFileName
             oldFileNames.push(filename)
     end
end

on_stylesheet_saved do |filename|
	if File.exists?(filename)
		css = File.read filename
		File.open(filename, 'w+') do |f|
			f << css.gsub(%r{(?<start>-s)(?<hash>[a-z0-9]{10})(?<file>\.png)}, '.png?v=\k<hash>')
		end
	end
	oldFileNames.each do |oldFilename|
	    if File.exists?(oldFilename)
	        File.delete(oldFilename)
	    end
	end
end