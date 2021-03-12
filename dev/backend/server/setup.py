from setuptools import setup, find_packages
<<<<<<< HEAD
    
=======

>>>>>>> 1aab4cbbef95588d6b6ad7e0ffe1e4c3bcb58de6
requires = [

]

tests_require = [
<<<<<<< HEAD
    
=======

>>>>>>> 1aab4cbbef95588d6b6ad7e0ffe1e4c3bcb58de6
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
            'fill_loftes_db=loftes.initialize_db:fill',
            'server_start=loftes.server_start:main',
<<<<<<< HEAD
            'dependencies=loftes.server_start:installDep'
=======
>>>>>>> 1aab4cbbef95588d6b6ad7e0ffe1e4c3bcb58de6
        ],
    },
)
