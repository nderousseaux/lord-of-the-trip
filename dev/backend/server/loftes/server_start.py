import os
import sys

def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri>\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)


def main(argv=sys.argv):
    if len(argv) != 2:
        usage(argv)
    config_uri = argv[1]
    os.system("env/bin/python setup.py develop && env/bin/python setup.py install && env/bin/pserve " + config_uri + " --reload")
    


