# Setup ports in the firewall

`iptables -A INPUT -m conntrack --ctstate NEW -m tcp -p tcp --dport 80 -j ACCEPTD`
`iptables -A INPUT -m conntrack --ctstate NEW -m tcp -p tcp --dport 3000 -j ACCEPTD`
`iptables-save`
`service iptables restart`