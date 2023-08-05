import Button from '@/components/Button';
import Input from '@/components/Input';
import Layout from '@/components/Layout';

function Edit() {
  return (
    <Layout>
      <h1 className="text-xl font-bold mb-5">Edit</h1>
      <div className="w-1/2 ">
        <form>
          <Input label="Title" name="title" />
          <Input label="Price" name="price" />
          <Button type="submit">Save</Button>
        </form>
      </div>
    </Layout>
  );
}

export default Edit;
