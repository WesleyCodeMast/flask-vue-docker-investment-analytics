def setup_admin() -> any:
    import sys

    sys.argv = ['main.py', 'admin']

    from core.application import setup_application

    flask = setup_application()

    return flask


app = setup_admin()