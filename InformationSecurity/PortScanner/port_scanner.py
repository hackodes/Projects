import socket
import re
from common_ports import ports_and_services  

def get_open_ports(target, port_range, verbose = False):
    open_ports = []
    ipv4_regex = re.compile(r'^\d{1,3}(\.\d{1,3}){3}$') 

    try:
        target_ip = socket.gethostbyname(target)  
    except socket.gaierror:
        if ipv4_regex.match(target): 
            return "Error: Invalid IP address"
        return "Error: Invalid hostname"

    for port in range(port_range[0], port_range[1] + 1):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.settimeout(1)
            result = sock.connect_ex((target_ip, port)) 
            if result == 0:
                open_ports.append(port)

    if verbose:
        try:
            host_name = socket.gethostbyaddr(target_ip)[0]  
        except socket.herror:
            host_name = None

        if host_name:
            result = f"Open ports for {host_name} ({target_ip})"
        else:
            result = f"Open ports for {target_ip}"
        result += "\nPORT     SERVICE"
        
        for port in open_ports:
            service_name = ports_and_services.get(port, "unknown")
            result += "\n{:<9}{}".format(port, service_name) 
        return result

    return open_ports
