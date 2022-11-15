# on the Kube and its Terror:
## or, the Gentle art of Borgin

Lets take it from the top as best we can:

Pods are the most basic unit: like the classical greek Atomi, they cannot be divided, split, or otherwise cut in half.

Pods can reside on containers. However, containers themselves cannot be listed out. These containers in turn reside on Nodes, which are either virtual or physical hosts. These are divided into either master/leader/bastardOperatorFromHell nodes and the slightly more manageable worker nodes. These names change from time to time.

You generally interact with this overall structure (known as a cluster) via a CLI tool known as kubectl. Probably want to set that up as an alias in your Bashrc file, because it has a long name.

K8s services work at the connection level: when new connections to a service opens, random pods are selected. So, if we curl to a node, it counts as an entire connection and ends there: when we use a browser, stuff stays alive for longer than may be expected.