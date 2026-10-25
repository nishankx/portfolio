const projects = [
  {
    id: 1,
    title: "KafkaZero",
    techStack: [
      "Golang",
      "Distributed Systems",
      "Concurrency",
      "TCP Networking",
    ],
    oneLineDesc:
      "A Kafka-inspired distributed event streaming system, built from first principles in Go.",
    miniDescription:
      "A minimal, from-scratch distributed commit log and message broker inspired by Apache Kafka. Implements partitioned topic logs, offset management, concurrent consumer groups, and TCP client-broker protocol in Go.",
    github: "https://github.com/nishankx/kafka-zero",
    demo: "",
    date: "ONGOING",
  },

  {
    id: 2,
    title: "GoRedis",
    techStack: [
      "Golang",
      "RESP Protocol",
      "TCP Server",
      "AOF Persistence",
    ],
    oneLineDesc:
      "A lightweight, from-scratch implementation of a Redis-compatible in-memory key-value database server written in Go.",
    miniDescription:
      "This project implements the core components of Redis: a custom RESP (REdis Serialization Protocol) parser and serializer, an in-memory data store with thread-safe locking, a TCP server, and AOF (Append-Only File) persistence for durability across restarts.",
    github: "https://github.com/nishankx/goredis",
    demo: "",
    date: "ONGOING",
  },

  {
    id: 3,
    title: "Torrentis",
    techStack: [
      "Golang",
      "BitTorrent Protocol",
      "P2P Networking",
      "Bencode",
    ],
    oneLineDesc:
      "A BitTorrent client built from scratch in Go for peer-to-peer file sharing and concurrent piece downloading.",
    miniDescription:
      "Implements the core BitTorrent specification: Bencode parser, tracker communication over HTTP/UDP, P2P peer handshake and wire protocol, piece verification with SHA-1 hashing, and concurrent piece assembly.",
    github: "https://github.com/nishankx/torrentis",
    demo: "",
    date: "ONGOING",
  },
];

export default projects;