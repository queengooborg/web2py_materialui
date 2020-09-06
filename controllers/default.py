# -*- coding: utf-8 -*-

response.view = "layout.html"

def index():
	return dict(props=locals())

def login():
	return dict(props=locals())

# def simpleindex():
#     title = "Testing react with web2py not using webpack, simple js includes"
#     props = {"users": [{"username": "bob"}, {"username": "alice"}]}
#     component = "testindex.js"

#     return dict(title=title, props=props, component=component)

# def advanced():
#     title = "Using a big component"
#     props = {"products": [{'id': 1, 'name': "Apples", 'price': 1.20},
#                           {'id': 2, 'name': "Pears", 'price': 1.80}]}
#     component = "pageAdvanced.js"

#     return dict(title=title, props=props, component=component)

# def reduxforms():
#     title = "using redux-forms"
#     props = {}
#     component = "advancedForm.js"
#     return dict(title=title, props=props, component=component)

# def reduxvalidation():
#     title = "using redux-forms with backend validation"

#     form = SQLFORM.factory(
#         Field('firstName', requires=IS_NOT_EMPTY()),
#         Field('lastName'),
#         Field('email', requires=IS_EMAIL()),
#         Field('sex', requires=IS_IN_SET(('male', 'female'))),
#         Field('favoriteColor', requires=IS_IN_SET(
#             ('ff0000', '00ff00', '0000ff'))),
#         Field('employed', 'boolean'),
#         Field('Notes', 'text'))
#     form.validate()
#     component = "validatingForm.js"
#     props = {'formname': form.formname, 'formkey': form.formkey}

#     return dict(title=title, props=props, component=component, errors=form.errors)

@cache.action()
def download():
	"""
	allows downloading of uploaded files
	http://..../[app]/default/download/[filename]
	"""
	return response.download(request, db)

def call():
	"""
	exposes services. for example:
	http://..../[app]/default/call/jsonrpc
	decorate with @services.jsonrpc the functions to expose
	supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
	"""
	return service()

def git_update():
	data = {}
	tag_name = ""
	user_agent = request.env.http_user_agent

	try:
		data = json.load(request.body)
	except ValueError:
		return {'status': 'failed'}

	if 'Bitbucket-Webhooks' in user_agent:
		logging.info('BitBucket sent us some data!')
		if 'push' in data:
			for change in data['push']['changes']:
				if change['new'] and change['new']['type'] == 'tag' and change['created']:
					tag_name = change['new']['name']
					logging.info('Tag created on BitBucket!  %s', tag_name)
	elif 'GitHub-Hookshot' in user_agent:
		logging.info('GitHub sent us some data!')
		if '/tags' in data['ref'] and data['created']:
			tag_name = data['ref'].split('tags/')[1]

	if tag_name == "":
		return {'status': 'ignored'}

	cwd = os.path.join(request.env.web2py_path, 'applications', request.application)

	git = sh.git.bake(_cwd=cwd)
	git.fetch()

	try:
		git.checkout('tags/%s' %tag_name, force=True)
	except Exception as e: # pylint: disable=broad-except
		send_mail(to="vinyldarkscratch@gooborg.com",
			subject='crttech.repair Update Failure | %s Failed on Git Checkout' %tag_name,
			message="The most recent git push failed.\n\n%s" %e
		)
		return {'status': 'failed'}

	pip = sh.Command("python{0}.{1}".format(sys.version_info[0], sys.version_info[1])).bake("-m", "pip", _cwd=cwd)
	
	try:
		pip.install('-r', 'requirements.txt', '--user')
	except Exception as e: # pylint: disable=broad-except
		send_mail(to="vinyldarkscratch@gooborg.com",
			subject='crttech.repair Update Failure | %s Failed on Pip Requirements' %tag_name,
			message="Installation of Python requirements failed.\n\n%s" %e
		)
		return {'status': 'failed'}

	nodejs = sh.Command("yarn", _cwd=os.path.join(cwd, 'static'))
	
	try:
		nodejs.init()
	except Exception as e: # pylint: disable=broad-except
		send_mail(to="vinyldarkscratch@gooborg.com",
			subject='crttech.repair Update Failure | %s Failed on NodeJS Requirements' %tag_name,
			message="Installation of NodeJS requirements failed.\n\n%s" %e
		)
		return {'status': 'failed'}

	return {'status': 'success'}
