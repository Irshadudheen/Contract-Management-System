import { ContainerPost, DetailsPost, HeadingPost, ImagePost, TextPost } from '../../components/materialui';

const Post = ({ post }) => {
    const url = post.image ? post.image : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 
    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'finalized':
                return 'green';
            case 'in progress':
                return 'orange';
            case 'draft':
                return 'gray';
            default:
                return 'gray';
        }
    }
    

    return (
        <ContainerPost>
            <ImagePost src={url} alt="post" />
            <TextPost>{post.categories}</TextPost>
            <HeadingPost>{addEllipsis(post.contractTitle, 20)}</HeadingPost>
            <TextPost>Client: {post.clientName}</TextPost>
            <DetailsPost>{addEllipsis(post.contractData, 29)}</DetailsPost>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginTop: '5px',
                gap: '8px' 
            }}>
                <TextPost style={{ margin: 0 }}>Status:</TextPost>
                <TextPost style={{ 
                    margin: 0, 
                    fontWeight: 'bold',
                    color: getStatusColor(post.status)
                }}>
                    {post.status}
                </TextPost>
            </div>
        </ContainerPost>
    )
}



export default Post;