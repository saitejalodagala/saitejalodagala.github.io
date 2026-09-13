#!/usr/bin/env python3
"""
High-performance multithreaded local server for Sai Teja Lodagala's Portfolio
Run: python serve.py [port]
"""

import http.server
import sys
from pathlib import Path

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
DIRECTORY = Path(__file__).resolve().parent

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    server_address = ('', PORT)
    httpd = http.server.ThreadingHTTPServer(server_address, CustomHandler)
    url = f"http://localhost:{PORT}"
    print(f"==================================================")
    print(f"  Sai Teja Lodagala - Portfolio Web Server")
    print(f"  Running at: {url}")
    print(f"  Root Dir:   {DIRECTORY}")
    print(f"  Press Ctrl+C to stop the server")
    print(f"==================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        httpd.server_close()

if __name__ == '__main__':
    main()
