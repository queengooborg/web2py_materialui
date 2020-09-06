# web2py-simple-seo
Simple SEO metadata plugin for web2py, including Open Graph and Twitter Cards.

Installation
============

Download The plugin installer (.w2p file) and install it via the web2py interface.

Then, inside of `models/menu.py`, replace all of the following:

```python
# ----------------------------------------------------------------------------------------------------------------------
# Customize your APP title, subtitle and menus here
# ----------------------------------------------------------------------------------------------------------------------

response.logo = A(B('web', SPAN(2), 'py'), XML('&trade;&nbsp;'),
                  _class="navbar-brand", _href="http://www.web2py.com/",
                  _id="web2py-logo")
response.title = request.application.replace('_', ' ').title()
response.subtitle = ''

# ----------------------------------------------------------------------------------------------------------------------
# read more at http://dev.w3.org/html5/markup/meta.name.html
# ----------------------------------------------------------------------------------------------------------------------
response.meta.author = myconf.get('app.author')
response.meta.description = myconf.get('app.description')
response.meta.keywords = myconf.get('app.keywords')
response.meta.generator = myconf.get('app.generator')
```

with the following, and customize as needed:

```python
from plugin_simple_seo.seo import *

init_seo(
    title="Gooborg Studios", 
    author="Vinyl Darkscratch",
    description="Gooborg Studios, " + T("An online game development and art studio").lower(),
    keywords='gooborg, production, studio, online, international, music, animation, art, website, programming, porting, game, game dev, game development, translation, speak louder, lightpad, _The_Ch@nge_, gooicons, goofont, dubstephorror, dubstep horror, records, gooborg records, record label, edm, edm label, dubstep, trap, riddim, chill, drum and bass, future bass, glitch hop',
    type='website', 
    card='summary',
    generator="Web2py Web Framework",
    image=STATIC('images', 'logo', 'logo_glow.png'),
    site_name="Gooborg Studios",
    twitter_username="gooborgstudios",
    locale=T.accepted_language or 'en',
    locale_alternate=[]
)
```

The plugin will set all of the original variables for you, along with adding in the OpenGraph and Twitter Card meta tags needed for proper embedding into other services.

_Note that you must have `{{include 'web2py_ajax.html'}}` or `{{response.include_meta()}}` in your view template._

Usage
=====
There are two ways to set properties for each controller action.

One is as a function decorator, which is our preference.  The function's names are simply the property name in lowercase, as such:

```python
# in controllers/default.py

@title(T("Home"))
@description(T("My beautiful home page"))
def index():
	return dict()
```

The other, for more dynamic pages, is to call the functions inside of the controller action, prepending `set_` to the function names stated above:

```python
# in controllers/default.py

def profile():
	username = "foobar"
	userpic = URL('static', 'images', args=['defaultprofilepic.png'])
	
	set_title(T("%s's Profile") %username)
	set_description(T("Profile for %s") %username)
	set_image(userpic)
	
	return locals()
```
