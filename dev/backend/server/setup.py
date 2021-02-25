from setuptools import setup, find_packages
    
requires = [

]

tests_require = [
    
]

setup(
    name='loftes',
    version='0.0',
    description='loftes',
    long_description='loftes',
    author='',
    author_email='',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = loftes:main',
        ],
        'console_scripts': [
            'initialize_loftes_db=loftes.initialize_db:main',
        ],
    },
)
