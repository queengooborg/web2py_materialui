# -*- coding: utf-8 -*-

# Gooborg.com - Model - Menu
# (c) Gooborg Studios, 2018-2020.  All rights reserved.

from plugin_simple_seo.seo import *

init_seo(
	title="web2py + Material UI",
	author="Queen Vinyl Darkscratch [https://www.queengoob.org]",
	description="web2py, reactjs, materialui, material ui, template, template app",
	type='website',
	card='summary',
	generator="ReactJS + web2py",
	image=STATIC('images', 'favicon', 'favicon-192x192.png'),
	site_name="web2py + Material UI",
	twitter_username="",
	locale=T.accepted_language or 'en',
	locale_alternate=[]
)

response.menu = []
