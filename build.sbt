ThisBuild / scalaVersion := "3.9.0"
ThisBuild / organization := "com.example"
ThisBuild / version      := "0.1.0"

lazy val root = (project in file("."))
  .settings(
    name := "scala-notification-system",
    libraryDependencies += "org.scalameta" %% "munit" % "1.3.6" % Test,
    Test / parallelExecution := false,
    scalacOptions ++= Seq("-deprecation", "-feature", "-unchecked")
  )
