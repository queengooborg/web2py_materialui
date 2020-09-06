# web2py Module: plugin_simple_seo
# Original version (c) cccaballero (https://github.com/daxslab/web2py-simple-seo), version 2.0 (c) Vinyl Darkscratch (Gooborg Studios), 2018-2020.

__author__ = ['vinyldarkscratch', 'cccaballero']

from gluon import *
from collections import OrderedDict

# -=- Basic Set Functions -=-

def set_seo_tag(name, value):
	if value is None:
		return
	if isinstance(value, dict):
		for k, v in value.items():
			if k == "main":
				set_seo_tag(name, v)
			else: set_seo_tag("%s:%s" %(name, k), v)
	if isinstance(value, list):
		for i in range(len(value)):
			d = OrderedDict()
			d['property'] = "%s" %name
			d['name'] = "%s" %name
			d['content'] = value[len(value)]
			current.response.meta['%s_%d' %(name.replace(":", "_"), i)] = d
	else:
		d = OrderedDict()
		d['property'] = "%s" %name
		d['name'] = "%s" %name
		d['content'] = value
		current.response.meta['%s' %name.replace(":", "_")] = d

# web2py Meta
def set_meta(name, value):
	set_seo_tag(name, value)
	current.response[name] = value

# Open Graph
def set_og(name, value):
	set_seo_tag("og:%s" %name, value)

# Twitter Card
def set_tc(name, value):
	set_seo_tag("tc:%s" %name, value)

def set_all_seo(name, value):
	set_meta(name, value)
	set_og(name, value)
	set_tc(name, value)

# -=- Initializers -=-

def init_seo(type="website", card="summary", title=None, author=None, keywords=None, generator="Web2py Web Framework", image=None, description=None, determiner="auto", site_name=None, locale=current.T.accepted_language or 'en', locale_alternate=[], twitter_username=None, label1=None, data1=None, label2=None, data2=None):
	init_meta(title, description, keywords, author, generator)
	init_og(type, title, image, description, determiner, site_name, locale, locale_alternate)
	init_tc(card, title, twitter_username, label1, data1, label2, data2, image, description)

def init_meta(title=None, description=None, keywords=None, author=None, generator="Web2py Web Framework"):
	data = locals()
	for name in ['title', 'description', 'keywords', 'author', 'generator']:
		if data[name]: set_meta(name, data[name])

def init_og(type="website", title=None, image=None, description=None, determiner="auto", site_name=None, locale=None, locale_alternate=[]):
	url = URL(args=current.request.args, host=True)
	data = locals()
	for name in ['type', 'title', 'image', 'url', 'description', 'determiner', 'site_name', 'locale']:
		if data[name]: set_og(name, data[name])

def init_tc(card="summary", title=None, username=None, label1=None, data1=None, label2=None, data2=None, image=None, description=None):
	data = locals()
	for name in ['card', 'title', 'label1', 'data1', 'label2', 'data2', 'image', 'description']:
		if data[name]: set_tc(name, data[name])
	if username:
		for name in ['site', 'creator']: set_tc(name, username)

# -=- Specific Types -=-

# XXX Add the following types:
	# book: http://ogp.me/ns/book#
	# books: http://ogp.me/ns/books#
	# business: http://ogp.me/ns/business#
	# fitness: http://ogp.me/ns/fitness#
	# game: http://ogp.me/ns/game#
	# music: http://ogp.me/ns/music#
	# place: http://ogp.me/ns/place#
	# product: http://ogp.me/ns/product#
	# restaurant: http://ogp.me/ns/restaurant#
	# video: http://ogp.me/ns/video#

# https://developers.facebook.com/docs/reference/opengraph/#object-type

# Article
def set_article(author=None, content_tier="free", expiration_time=None, modified_time=None, published_time=None, publisher=None, section=None, tags=[]):
	set_og("type", "article")
	set_og("article:author", author)
	set_og("article:expiration_time", expiration_time)
	set_og("article:modified_time", modified_time)
	set_og("article:published_time", published_time)
	set_og("article:publisher", publisher)
	set_og("article:section", section)
	set_og("article:tags", tags)
	if content_tier in ['free', 'locked', 'metered']: set_og("article:content_tier", content_tier)

def article(first_name=None, last_name=None, username=None, gender=None):
	def wrapper(function):
		def f(*args, **kwargs):
			set_article(author=None, content_tier="free", expiration_time=None, modified_time=None, published_time=None, publisher=None, section=None, tags=[])

			return function(*args, **kwargs)
		return f
	return wrapper

# Profile
def set_profile(first_name=None, last_name=None, username=None, gender=None):
	set_og("type", "profile")
	set_og("profile:first_name", first_name)
	set_og("profile:last_name", last_name)
	set_og("profile:username", username)
	if gender in ['male', 'female']: set_all_seo("profile:gender", gender)

def profile(first_name=None, last_name=None, username=None, gender=None):
	def wrapper(function):
		def f(*args, **kwargs):
			set_profile(first_name, last_name, username, gender)

			return function(*args, **kwargs)
		return f
	return wrapper

# -=- Specific Properties -=-

# Title
def set_title(title):
	set_all_seo("title", title)

def title(new_title):
	def wrapper(function):
		def f(*args, **kwargs):
			set_title(new_title)

			return function(*args, **kwargs)
		return f
	return wrapper

# Description
def set_description(description):
	set_all_seo("description", description)

def description(new_description):
	def wrapper(function):
		def f(*args, **kwargs):
			set_description(new_description)

			return function(*args, **kwargs)
		return f
	return wrapper

# Image
def set_image(image):
	set_og("image", image)
	set_tc("image", image)

def image(new_image):
	def wrapper(function):
		def f(*args, **kwargs):
			set_image(new_image)

			return function(*args, **kwargs)
		return f
	return wrapper
