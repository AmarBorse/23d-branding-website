import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-hero notfound">
      <div className="container center">
        <h1 className="page-title">This page wandered off</h1>
        <p className="lead">The link may be old or mistyped.</p>
        <Link href="/" className="btn btn--green">Go to the home page</Link>
      </div>
    </section>
  );
}
