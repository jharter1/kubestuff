# on the Kube and its Terror:
## or, the Gentle art of Borgin

Lets take it from the top as best we can:

Pods are the most basic unit: like the classical greek Atomi, they cannot be divided, split, or otherwise cut in half.

Pods can reside on containers. However, containers themselves cannot be listed out (at least in the case of most cloud providers). These containers in turn reside on Nodes, which are either virtual or physical hosts. These are divided into either master/leader/bastardOperatorFromHell nodes and the slightly more manageable worker nodes. These names change from time to time.

You generally interact with this overall structure (known as a cluster) via a CLI tool known as kubectl. Probably want to set that up as an alias in your Bashrc file, because it has a long name.

K8s services work at the connection level: when new connections to a service opens, random pods are selected. So, if we curl to a node, it counts as an entire connection and ends there: when we use a browser, stuff stays alive for longer than may be expected.

## Going Outside

Ingress (via IP, CNAME, what have you) is going to be entirely dependent on your cloud provider (or minikube or whatever else you want to use)

## Doing it right

Lots of old k8s books say 'just run `kubectl run nginx` in your platform and everything else will be easy. This is wrong.

What you _actually_ have to do is a `kubectl create deployment named --image`; rather than building a singular pod, this will help you generate a Deployment, containing a ReplicaSet, which can in turn run its own pods. This has a number of advantages: replicasets can be scaled up, exposed, assigned ports, and all that good stuff. This appears to be broken for individual pods, so we won't bother with it.

But this is still not the _right_ way to do it. What you really want is a Deployment.yaml file that you can rinse, repeat, share, and edit as IaC to your heart's content.

Consider the following:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jacks-deployment
  labels:
    app: jacks
spec:
  replicas: 3
  selector:
    matchLabels:
      app: jacks
  template:
    metadata:
      labels:
        app: jacks
    spec:
      containers:
      - name: jacks
        image: jayharts1/kubia
        ports:
        - containerPort: 8080

```

This is a nice, simple pod that allows us to `curl` to it and give back its URL, as it understands such things.


## LoadBalancer vs. Nodeport

These both exist to accept ingress traffic.

## Liveness vs. Readiness Probes

