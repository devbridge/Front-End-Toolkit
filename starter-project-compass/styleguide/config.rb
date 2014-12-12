# Set this to the root of your project when deployed:
output_style = :minified
line_comments = false
relative_assets = true
sprite_engine = :chunky_png
chunky_png_options = :best_compression
environment = :development

#================================================#
#Section: Http Paths                             #
#================================================#
http_path = '/'
http_stylesheets_path = http_path + '/' + 'template/content/styles' + '/' + 'css'
http_images_path = http_path + '/' + 'template/content/styles' + '/' + 'images'
http_generated_images_path = http_images_path

#================================================#
#Section: Compass Directories                    #
#================================================#
css_dir = 'template/content/styles/css'
images_dir = 'template/content/styles/images'
generated_images_dir = 'template/content/styles/images'
sass_dir = 'template/content/styles/scss'

#================================================#
#Section: Compass Paths                          #
#================================================#
project_path = File.realpath(File.join(File.dirname(__FILE__)))
css_path = project_path + '/' + css_dir
sass_path = project_path + '/' + sass_dir
generated_images_path = project_path + '/' + 'template/content/styles/images'
images_path = project_path + '/' + 'template/content/styles/images'
sprite_load_path = project_path + '/' + "template/content/styles/images"
oldFileNames = Array.new

#================================================#
#Section: Compass Spriting Rules                 #
#================================================#
on_sprite_saved do |filename|
     if File.exists?(filename)
             newFileName = filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
             FileUtils.cp filename, newFileName
             oldFileNames.push(filename)
     end
end

on_stylesheet_saved do |filename|
	# Replace in stylesheets generated references to sprites
	# by their counterparts without the hash uniqueness.
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