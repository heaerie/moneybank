wget -q -O - https://jenkins-ci.org/debian/jenkins-ci.org.key|sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins-ci.org/debian binary/ >/etc/apt/sources.list.d/jenlins.list'
sudo apt-get update
sudo apt-get install jenkins

arch


java -version
Picked up JAVA_TOOL_OPTIONS: -javaagent:/usr/share/java/jayatanaag.jar 
openjdk version "1.8.0_45-internal"
OpenJDK Runtime Environment (build 1.8.0_45-internal-b14)
OpenJDK 64-Bit Server VM (build 25.45-b02, mixed mode)


